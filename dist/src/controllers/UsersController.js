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
exports.UsersController = void 0;
var SpecializationsService_1 = require("../services/SpecializationsService");
var UsersService_1 = require("../services/UsersService");
var usersService = new UsersService_1.UsersService();
// User controller class
var UsersController = /** @class */ (function () {
    function UsersController() {
    }
    // Register
    UsersController.prototype.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, email, password, medic, user_id, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, name = _a.name, email = _a.email, password = _a.password, medic = _a.medic;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.register({ name: name, email: email, password: password, medic: medic })];
                    case 2:
                        user_id = _b.sent();
                        return [2 /*return*/, res.json(user_id)];
                    case 3:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Login
    UsersController.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.login(email, password)];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, res.json(user)];
                    case 3:
                        err_2 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_2.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get user account
    UsersController.prototype.getAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, userAccount, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.getAccount(id)];
                    case 2:
                        userAccount = _a.sent();
                        return [2 /*return*/, res.json(userAccount)];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_3.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Getting medic account
    UsersController.prototype.getMedicAccount = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, medicAccount, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.getMedicAccount(id)];
                    case 2:
                        medicAccount = _a.sent();
                        return [2 /*return*/, res.json(medicAccount)];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Edit account
    UsersController.prototype.edit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, image_url, email, password, age, mass, chronic_diseases, id, user, err_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, image_url = _a.image_url, email = _a.email, password = _a.password, age = _a.age, mass = _a.mass, chronic_diseases = _a.chronic_diseases;
                        id = req.headers.authorization;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.editAccout({ id: id, image_url: image_url, email: email, password: password, age: age, mass: mass, chronic_diseases: chronic_diseases })];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, res.json(user)];
                    case 3:
                        err_5 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_5.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Edit medic account
    UsersController.prototype.medicsEdit = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, description, phone_number, patient_preferences, id, user, err_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, description = _a.description, phone_number = _a.phone_number, patient_preferences = _a.patient_preferences;
                        id = req.headers.authorization;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.editMedicAccount({ id: id, description: description, phone_number: phone_number, patient_preferences: patient_preferences })];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, res.json(user)];
                    case 3:
                        err_6 = _b.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_6.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Search medics
    UsersController.prototype.getMedics = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, page, _b, specialization_name, specialization_id, medics, err_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = req.params.page, page = _a === void 0 ? 0 : _a;
                        _b = req.query.specialization_name, specialization_name = _b === void 0 ? "" : _b;
                        return [4 /*yield*/, SpecializationsService_1.specializationsDB.getSpecializationIdByName(specialization_name)];
                    case 1:
                        specialization_id = _c.sent();
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, usersService.getMedics(page, specialization_id)];
                    case 3:
                        medics = _c.sent();
                        return [2 /*return*/, res.json(medics)];
                    case 4:
                        err_7 = _c.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_7.message })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    // Delete account
    UsersController.prototype.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user_id, err_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        user_id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.delete(user_id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                    case 3:
                        err_8 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_8.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Create medic open days
    UsersController.prototype.createOpenDay = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var date, id, open_day_id, err_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        date = req.body.date;
                        id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.createOpenDay(id, date)];
                    case 2:
                        open_day_id = _a.sent();
                        return [2 /*return*/, res.json(open_day_id)];
                    case 3:
                        err_9 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_9.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Get medic open days
    UsersController.prototype.getMedicOpenDays = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, medic_open_days, err_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.headers.authorization;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.getMedicOpenDays(id)];
                    case 2:
                        medic_open_days = _a.sent();
                        return [2 /*return*/, res.json(medic_open_days)];
                    case 3:
                        err_10 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_10.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Delete medic open day
    UsersController.prototype.deleteMedicOpenDay = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var medic_id, id, err_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        medic_id = req.headers.authorization;
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, usersService.deleteMedicOpenDay(medic_id, id)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).send()];
                    case 3:
                        err_11 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_11.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UsersController;
}());
exports.UsersController = UsersController;
