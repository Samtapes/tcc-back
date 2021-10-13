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
exports.UsersService = void 0;
var uuid_1 = require("uuid");
var connection_1 = require("../database/connection");
var GetDateTime_1 = require("../database/GetDateTime");
var getDateTime = new GetDateTime_1.GetDateTime();
// User service class
var UsersService = /** @class */ (function () {
    function UsersService() {
    }
    // Register
    UsersService.prototype.register = function (_a) {
        var name = _a.name, email = _a.email, password = _a.password, medic = _a.medic;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, specializationExists, userID, specializationExists, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').select('id').where('email', '=', email).first()];
                    case 1:
                        userExists = _b.sent();
                        if (!(userExists !== undefined)) return [3 /*break*/, 2];
                        throw new Error("Esse Email j\u00E1 est\u00E1 em uso!");
                    case 2:
                        if (!medic) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection_1.connection('specializations').select('id').where('id', '=', medic.specialization_id).first()];
                    case 3:
                        specializationExists = _b.sent();
                        // Checking if specialization exists
                        if (specializationExists === undefined) {
                            throw new Error("Essa especializa\u00E7\u00E3o n\u00E3o existe!");
                        }
                        _b.label = 4;
                    case 4:
                        userID = uuid_1.v4();
                        // Creating user
                        return [4 /*yield*/, connection_1.connection('users').insert({
                                id: userID,
                                name: name,
                                email: email,
                                password: password,
                                is_medic: Boolean(medic)
                            })
                            // Creating user account data
                        ];
                    case 5:
                        // Creating user
                        _b.sent();
                        // Creating user account data
                        return [4 /*yield*/, connection_1.connection('accounts_data').insert({
                                user_id: userID,
                            })
                            // If is a medic 
                        ];
                    case 6:
                        // Creating user account data
                        _b.sent();
                        if (!medic) return [3 /*break*/, 9];
                        return [4 /*yield*/, connection_1.connection('specializations').select('id').where('id', '=', medic.specialization_id).first()];
                    case 7:
                        specializationExists = _b.sent();
                        // Checking if specialization exists
                        if (specializationExists === undefined) {
                            throw new Error("Essa especializa\u00E7\u00E3o n\u00E3o existe!");
                        }
                        return [4 /*yield*/, connection_1.connection('medics').insert({
                                user_id: userID,
                                specialization_id: medic.specialization_id,
                                register_number: medic.register_number,
                                phone_number: medic.phone_number,
                            })];
                    case 8:
                        _b.sent();
                        _b.label = 9;
                    case 9: return [4 /*yield*/, connection_1.connection('users').select('id').where('email', '=', email).first()];
                    case 10:
                        user = _b.sent();
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // Login
    UsersService.prototype.login = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var emailExists, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').select('id', 'is_medic').where('email', '=', email).first()];
                    case 1:
                        emailExists = _a.sent();
                        if (!emailExists) {
                            throw new Error("Conta inexistente");
                        }
                        return [4 /*yield*/, connection_1.connection('users')
                                .where('email', '=', email)
                                .where('password', '=', password)
                                .select('users.id', 'users.image_url', 'users.name', 'users.email', 'users.password', 'users.is_medic')
                                .first()];
                    case 2:
                        user = _a.sent();
                        // If the password is wrong
                        if (!user) {
                            throw new Error("Senha incorreta!");
                        }
                        return [2 /*return*/, user];
                }
            });
        });
    };
    // Get user account
    UsersService.prototype.getAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var userAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('accounts_data').where('user_id', id).select('accounts_data.age', 'accounts_data.mass', 'accounts_data.chronic_diseases').first()];
                    case 1:
                        userAccount = _a.sent();
                        // Checking if exists
                        if (!userAccount) {
                            throw new Error("Conta inexistente");
                        }
                        return [2 /*return*/, userAccount];
                }
            });
        });
    };
    // Get medic account
    UsersService.prototype.getMedicAccount = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var medicAccount;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics')
                            .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
                            .where('user_id', id)
                            .select('medics.user_id', 'specializations.name as specialization', 'medics.register_number', 'medics.description', 'medics.phone_number', 'medics.patient_preferences')
                            .first()
                        // Checking if the medic exists
                    ];
                    case 1:
                        medicAccount = _a.sent();
                        // Checking if the medic exists
                        if (!medicAccount) {
                            throw new Error("Conta inexistente!");
                        }
                        return [2 /*return*/, medicAccount];
                }
            });
        });
    };
    // Edit account data
    UsersService.prototype.editAccout = function (_a) {
        var id = _a.id, image_url = _a.image_url, password = _a.password, age = _a.age, mass = _a.mass, chronic_diseases = _a.chronic_diseases;
        return __awaiter(this, void 0, void 0, function () {
            var user, userUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users')
                            .join('accounts_data', 'users.id', '=', 'accounts_data.user_id')
                            .select('users.id', 'users.email', 'users.password', 'accounts_data.age', 'accounts_data.mass', 'accounts_data.chronic_diseases')
                            .where('users.id', '=', id)
                            .first()];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Conta inexistente");
                        }
                        if (!(image_url !== user.image_url || password !== user.password)) return [3 /*break*/, 3];
                        return [4 /*yield*/, connection_1.connection('users').update({
                                image_url: image_url,
                                password: password,
                                updated_at: getDateTime.stamp()
                            }).where('id', id)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!(age !== user.age || mass !== user.mass || chronic_diseases !== user.chronic_diseases)) return [3 /*break*/, 5];
                        return [4 /*yield*/, connection_1.connection('accounts_data').update({
                                age: age,
                                mass: mass,
                                chronic_diseases: chronic_diseases,
                                updated_at: getDateTime.stamp()
                            }).where('user_id', id)];
                    case 4:
                        _b.sent();
                        _b.label = 5;
                    case 5:
                        // If the user want to edit nothing
                        if (image_url === user.image_url && password && user.password && age === user.age && mass === user.mass && chronic_diseases === user.chronic_diseases) {
                            throw new Error("Não é possível editar suas informações para o mesmo que deseja alterar");
                        }
                        return [4 /*yield*/, connection_1.connection('users')
                                .where('id', '=', id)
                                .join('accounts_data', 'users.id', 'accounts_data.user_id')
                                .select('users.id', 'users.image_url', 'users.name', 'users.email', 'users.password', 'accounts_data.age', 'accounts_data.mass', 'accounts_data.chronic_diseases')
                                .first()];
                    case 6:
                        userUpdated = _b.sent();
                        return [2 /*return*/, userUpdated];
                }
            });
        });
    };
    // Edit medic account
    UsersService.prototype.editMedicAccount = function (_a) {
        var id = _a.id, description = _a.description, phone_number = _a.phone_number, patient_preferences = _a.patient_preferences;
        return __awaiter(this, void 0, void 0, function () {
            var user, userUpdated;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').select('user_id', 'description', 'phone_number', 'patient_preferences').where('user_id', '=', id).first()];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Conta inexistente");
                        }
                        if (!(description !== user.description || phone_number !== user.phone_number || patient_preferences !== user.patient_preferences)) return [3 /*break*/, 3];
                        return [4 /*yield*/, connection_1.connection('medics').update({
                                description: description,
                                phone_number: phone_number,
                                patient_preferences: patient_preferences,
                                updated_at: getDateTime.stamp()
                            }).where('user_id', id)];
                    case 2:
                        _b.sent();
                        return [3 /*break*/, 4];
                    case 3: throw new Error("Não é possível editar suas informações para o mesmo que deseja alterar");
                    case 4: return [4 /*yield*/, connection_1.connection('medics').select('user_id', 'description', 'phone_number', 'patient_preferences').where('user_id', '=', id).first()];
                    case 5:
                        userUpdated = _b.sent();
                        return [2 /*return*/, userUpdated];
                }
            });
        });
    };
    // Get all the medics
    UsersService.prototype.getMedics = function (page, specialization_id) {
        return __awaiter(this, void 0, void 0, function () {
            var medics_1, medics;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(specialization_id === null || specialization_id === undefined)) return [3 /*break*/, 2];
                        return [4 /*yield*/, connection_1.connection('medics')
                                .join('users', 'medics.user_id', '=', 'users.id')
                                .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
                                .join('consults_configurations', 'medics.user_id', '=', 'consults_configurations.medic_id')
                                .select('users.id', 'users.name', 'users.image_url', 'specializations.name as specialization').limit(10)
                                .offset(10 * page)];
                    case 1:
                        medics_1 = _a.sent();
                        return [2 /*return*/, medics_1];
                    case 2: return [4 /*yield*/, connection_1.connection('medics')
                            .join('users', 'medics.user_id', '=', 'users.id')
                            .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
                            .select('users.id', 'users.name', 'users.image_url', 'specializations.name as specialization')
                            .where('specializations.id', '=', specialization_id).limit(10)
                            .offset(10 * page)];
                    case 3:
                        medics = _a.sent();
                        return [2 /*return*/, medics];
                }
            });
        });
    };
    // Delete account
    UsersService.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var user, deleteUser, deleteAccountsData, deleteMedic, deleteConsultsConfigurations, deletOpenDays, deleteConnections, deleteVerificationCodes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').select('*').where('id', id).first()];
                    case 1:
                        user = _a.sent();
                        if (user === undefined) {
                            throw new Error("Usuário inexistente!");
                        }
                        return [4 /*yield*/, connection_1.connection('users').where('id', id).delete()];
                    case 2:
                        deleteUser = _a.sent();
                        return [4 /*yield*/, connection_1.connection('accounts_data').where('user_id', id).delete()];
                    case 3:
                        deleteAccountsData = _a.sent();
                        if (!user.is_medic) return [3 /*break*/, 7];
                        return [4 /*yield*/, connection_1.connection('medics').where('user_id', id).delete()];
                    case 4:
                        deleteMedic = _a.sent();
                        return [4 /*yield*/, connection_1.connection('consults_configurations').where('medic_id', id).delete()];
                    case 5:
                        deleteConsultsConfigurations = _a.sent();
                        return [4 /*yield*/, connection_1.connection('open_days').where('medic_id', id).delete()];
                    case 6:
                        deletOpenDays = _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, connection_1.connection('connections').where('user_id', id).delete()];
                    case 8:
                        deleteConnections = _a.sent();
                        return [4 /*yield*/, connection_1.connection('verification_codes').where('user_id', id).delete()];
                    case 9:
                        deleteVerificationCodes = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Create new open days
    UsersService.prototype.createOpenDay = function (id, date) {
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, openDayExist, open_day_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').where('user_id', id).select('user_id').first()];
                    case 1:
                        medicExist = _a.sent();
                        if (!medicExist) {
                            throw new Error("Conta inexistente!");
                        }
                        return [4 /*yield*/, connection_1.connection('open_days').where('medic_id', id).where('date', date).select('id').first()];
                    case 2:
                        openDayExist = _a.sent();
                        if (openDayExist) {
                            throw new Error("Não é possível criar um novo dia livre em um mesmo dia que já está livre!");
                        }
                        // Checking if this day is in the future or today
                        if (getDateTime.isPast(date)) {
                            throw new Error("Não é possível criar um novo dia livre em um dia já passado!");
                        }
                        open_day_id = uuid_1.v4();
                        return [4 /*yield*/, connection_1.connection('open_days').insert({
                                id: uuid_1.v4(),
                                medic_id: id,
                                date: date
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { id: open_day_id }];
                }
            });
        });
    };
    // Get medic open days
    UsersService.prototype.getMedicOpenDays = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, open_days;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').where('user_id', id).select('user_id').first()];
                    case 1:
                        medicExist = _a.sent();
                        if (!medicExist) {
                            throw new Error("Conta inexistente!");
                        }
                        return [4 /*yield*/, connection_1.connection('medics').where('user_id', id).join('open_days', 'medics.user_id', '=', 'open_days.medic_id').select('open_days.id', 'open_days.date')];
                    case 2:
                        open_days = _a.sent();
                        return [2 /*return*/, open_days];
                }
            });
        });
    };
    // Delete medic open day
    UsersService.prototype.deleteMedicOpenDay = function (medic_id, id) {
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, openDayExist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').where('user_id', medic_id).select('user_id').first()];
                    case 1:
                        medicExist = _a.sent();
                        if (!medicExist) {
                            throw new Error("Conta inexistente!");
                        }
                        return [4 /*yield*/, connection_1.connection('open_days').where('id', id).select('*').first()];
                    case 2:
                        openDayExist = _a.sent();
                        if (!openDayExist) {
                            throw new Error("Não é possível deletar esse dia em que o médico está aberto sendo que não existe!");
                        }
                        // Deleting the specific open day
                        return [4 /*yield*/, connection_1.connection('open_days').where('id', id).delete()];
                    case 3:
                        // Deleting the specific open day
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return UsersService;
}());
exports.UsersService = UsersService;
