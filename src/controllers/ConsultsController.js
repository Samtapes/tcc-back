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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsultsController = void 0;
var ConsultsService_1 = require("../services/ConsultsService");
var consultsService = new ConsultsService_1.ConsultsService();
var ConsultsController = /** @class */ (function () {
    function ConsultsController() {
    }
    // Creating consult configuration
    ConsultsController.prototype.createConfiguration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, price, start_of_work, end_of_work, description, additional_info, medic_id, consult_configuration_id, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, price = _a.price, start_of_work = _a.start_of_work, end_of_work = _a.end_of_work, description = _a.description, additional_info = _a.additional_info;
                        medic_id = req.headers.authorization;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.createConfiguration({ medic_id: medic_id, price: price, start_of_work: start_of_work, end_of_work: end_of_work, description: description, additional_info: additional_info })];
                    case 2:
                        consult_configuration_id = _b.sent();
                        return [2 /*return*/, res.json(consult_configuration_id)];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Editing consult configuration
    ConsultsController.prototype.editConfiguration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, price, start_of_work, end_of_work, description, additional_info, medic_id, config, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, price = _a.price, start_of_work = _a.start_of_work, end_of_work = _a.end_of_work, description = _a.description, additional_info = _a.additional_info;
                        medic_id = req.headers.authorization;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.editConfiguration({ medic_id: medic_id, price: price, start_of_work: start_of_work, end_of_work: end_of_work, description: description, additional_info: additional_info })];
                    case 2:
                        config = _b.sent();
                        return [2 /*return*/, res.json(config)];
                    case 3:
                        err_2 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_2.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Getting consult configuration
    ConsultsController.prototype.getConfiguration = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, configuration, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.getConfiguration(id)];
                    case 2:
                        configuration = _a.sent();
                        return [2 /*return*/, res.json(configuration)];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_3.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Creating consult
    ConsultsController.prototype.createConsult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, date, scheduled_time, additional_info, patient_id, medic_id, consult_id, err_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, date = _a.date, scheduled_time = _a.scheduled_time, additional_info = _a.additional_info;
                        patient_id = req.headers.authorization;
                        medic_id = req.params.medic_id;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.createConsult({ medic_id: medic_id, patient_id: patient_id, date: date, scheduled_time: scheduled_time, additional_info: additional_info })];
                    case 2:
                        consult_id = _b.sent();
                        return [2 /*return*/, res.json(consult_id)];
                    case 3:
                        err_4 = _b.sent();
                        return [2 /*return*/, res.status(404).json({ message: err_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Getting consult
    ConsultsController.prototype.getConsult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, _a, consultType, consults, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        user_id = req.headers.authorization;
                        _a = req.params.consultType, consultType = _a === void 0 ? 'pendentes' : _a;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.getConsults(user_id, consultType)];
                    case 2:
                        consults = _b.sent();
                        return [2 /*return*/, res.json(consults)];
                    case 3:
                        err_5 = _b.sent();
                        return [2 /*return*/, res.status(404).json({ message: err_5.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Edit consult
    ConsultsController.prototype.editConsult = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, date, scheduled_time, consult_id, user_id, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, date = _a.date, scheduled_time = _a.scheduled_time;
                        consult_id = req.params.consult_id;
                        user_id = req.headers.authorization;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.editConsultScheduledTime({ consult_id: consult_id, user_id: user_id, date: date, scheduled_time: scheduled_time })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send()];
                    case 3:
                        err_6 = _b.sent();
                        return [2 /*return*/, res.status(404).json({ message: err_6.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConsultsController.prototype.editConsultConfirmation = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var confirmation, consult_id, medic_id, err_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        confirmation = req.body.confirmation;
                        consult_id = req.params.consult_id;
                        medic_id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.editConsultConfirmation({ consult_id: consult_id, medic_id: medic_id, confirmation: confirmation })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                    case 3:
                        err_7 = _a.sent();
                        return [2 /*return*/, res.status(404).json({ message: err_7.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ConsultsController.prototype.editConsultStartFinishTime = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, consult_id, method, medic_id, err_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.params, consult_id = _a.consult_id, method = _a.method;
                        medic_id = req.headers.authorization;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, consultsService.editConsultStartFinishTime({ consult_id: consult_id, medic_id: medic_id, method: method })];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, res.status(200).send()];
                    case 3:
                        err_8 = _b.sent();
                        return [2 /*return*/, res.status(404).json({ message: err_8.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ConsultsController;
}());
exports.ConsultsController = ConsultsController;
