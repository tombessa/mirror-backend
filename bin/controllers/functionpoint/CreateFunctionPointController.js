"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFunctionPointController = void 0;
const CreateFunctionPointService_1 = require("../../services/functionpoint/CreateFunctionPointService");
const enum_1 = require("../../interface/enum");
class CreateFunctionPointController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, project_id, type, estimate_functional_size, count_functional_size } = req.body;
            const createFunctionPointService = new CreateFunctionPointService_1.CreateFunctionPointService();
            let created_by = req.user_id;
            let updated_by = req.user_id;
            let pcreate = {
                id: id,
                project_id: project_id,
                type: enum_1.TypeCountEnum[type],
                estimate_functional_size: estimate_functional_size,
                count_functional_size: count_functional_size,
                created_by: created_by,
                updated_by: updated_by,
            };
            const functionpoint = yield createFunctionPointService.execute(pcreate);
            return res.json(functionpoint);
        });
    }
}
exports.CreateFunctionPointController = CreateFunctionPointController;
