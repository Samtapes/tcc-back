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
exports.ConsultsService = void 0;
var connection_1 = require("../database/connection");
var GetDateTime_1 = require("../database/GetDateTime");
var uuid_1 = require("uuid");
var getDateTime = new GetDateTime_1.GetDateTime();
var ConsultsService = /** @class */ (function () {
    function ConsultsService() {
    }
    // Creating consult configuration
    ConsultsService.prototype.createConfiguration = function (_a) {
        var medic_id = _a.medic_id, price = _a.price, start_of_work = _a.start_of_work, end_of_work = _a.end_of_work, description = _a.description, additional_info = _a.additional_info;
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, configExist;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').select('user_id').where('user_id', medic_id).first()];
                    case 1:
                        medicExist = _b.sent();
                        if (!medicExist) {
                            throw new Error('Esse médico não existe!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('medic_id').where('medic_id', medic_id).first()];
                    case 2:
                        configExist = _b.sent();
                        if (configExist) {
                            throw new Error('A configuração já foi cadastradas! Não é possivel criar nova configuração! Somente editar a mesma');
                        }
                        // Creating new consult configuration
                        return [4 /*yield*/, connection_1.connection('consults_configurations').insert({
                                medic_id: medic_id,
                                price: price,
                                start_of_work: start_of_work,
                                end_of_work: end_of_work,
                                description: description,
                                additional_info: additional_info
                            })
                            // Returning medic id
                        ];
                    case 3:
                        // Creating new consult configuration
                        _b.sent();
                        // Returning medic id
                        return [2 /*return*/, { medic_id: medicExist.user_id }];
                }
            });
        });
    };
    // Edit medic consult configuration
    ConsultsService.prototype.editConfiguration = function (_a) {
        var medic_id = _a.medic_id, price = _a.price, start_of_work = _a.start_of_work, end_of_work = _a.end_of_work, description = _a.description, additional_info = _a.additional_info;
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, configExist, config;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').select('user_id').where('user_id', medic_id).first()];
                    case 1:
                        medicExist = _b.sent();
                        if (!medicExist) {
                            throw new Error('Esse médico não existe!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('*').where('medic_id', medic_id).first()];
                    case 2:
                        configExist = _b.sent();
                        if (!configExist) {
                            throw new Error('Configuração de consulta inexistente!');
                        }
                        // Checking if the medic want to change nothing
                        if (price === configExist.price && start_of_work === configExist.start_of_work && end_of_work === configExist.end_of_work && description === configExist.description && additional_info === configExist.additional_info) {
                            throw new Error('Não é possível alterar a configuração de consulta para a mesma!');
                        }
                        // Else update medic consult configuration
                        return [4 /*yield*/, connection_1.connection('consults_configurations').update({
                                price: price,
                                start_of_work: start_of_work,
                                end_of_work: end_of_work,
                                description: description,
                                additional_info: additional_info,
                                updated_at: getDateTime.stamp()
                            }).where('medic_id', medic_id)];
                    case 3:
                        // Else update medic consult configuration
                        _b.sent();
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('*').where('medic_id', medic_id).first()];
                    case 4:
                        config = _b.sent();
                        return [2 /*return*/, config];
                }
            });
        });
    };
    // Get consult configuration
    ConsultsService.prototype.getConfiguration = function (medic_id) {
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, configExist, configuration;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').select('user_id').where('user_id', medic_id).first()];
                    case 1:
                        medicExist = _a.sent();
                        if (!medicExist) {
                            throw new Error('Esse médico não existe!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('*').where('medic_id', medic_id).first()];
                    case 2:
                        configExist = _a.sent();
                        if (!configExist) {
                            throw new Error('Configuração de consulta inexistente!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations')
                                .where('medic_id', medic_id)
                                .join('medics', 'consults_configurations.medic_id', '=', 'medics.user_id')
                                .join('specializations', 'medics.specialization_id', '=', 'specializations.id')
                                .join('users', 'consults_configurations.medic_id', '=', 'users.id')
                                .select('users.id', 'users.image_url', 'users.name', 'specializations.name as specialization', 'consults_configurations.price', 'consults_configurations.description', 'consults_configurations.additional_info', 'consults_configurations.start_of_work', 'consults_configurations.end_of_work').first()];
                    case 3:
                        configuration = _a.sent();
                        return [2 /*return*/, configuration];
                }
            });
        });
    };
    // Create consult
    ConsultsService.prototype.createConsult = function (_a) {
        var medic_id = _a.medic_id, patient_id = _a.patient_id, date = _a.date, scheduled_time = _a.scheduled_time, additional_info = _a.additional_info;
        return __awaiter(this, void 0, void 0, function () {
            var medicExist, patientExist, configExist, openInThisDay, open_days, openInThisTime, start_hour, start_minute, end_hour, scheduled_time_hour, scheduled_time_minute, consultInThisTime, consults, consult_id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').select('user_id').where('user_id', medic_id).first()];
                    case 1:
                        medicExist = _b.sent();
                        if (!medicExist) {
                            throw new Error('Esse médico não existe!');
                        }
                        return [4 /*yield*/, connection_1.connection('users').select('id', 'is_medic').where('id', patient_id).first()];
                    case 2:
                        patientExist = _b.sent();
                        if (!patientExist) {
                            throw new Error('Esse paciente não existe!');
                        }
                        // Checking if the patient and the medic are the same
                        if (medicExist.user_id === patientExist.id) {
                            throw new Error("Não é possível marcar uma consulta com você mesmo!");
                        }
                        // Checking if the patient is medic
                        if (patientExist.is_medic) {
                            throw new Error("Não é possível marcar uma consulta como médico!");
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('*').where('medic_id', medic_id).first()];
                    case 3:
                        configExist = _b.sent();
                        if (!configExist) {
                            throw new Error('Médico não criou configuração de consulta!');
                        }
                        openInThisDay = false;
                        return [4 /*yield*/, connection_1.connection('open_days').select('date').where('medic_id', medic_id)];
                    case 4:
                        open_days = _b.sent();
                        open_days.forEach(function (element) {
                            if (element.date === date) {
                                openInThisDay = true;
                            }
                        });
                        if (!openInThisDay) {
                            throw new Error('O médico não está aberto nesse dia!');
                        }
                        openInThisTime = false;
                        start_hour = parseInt(String(configExist.start_of_work[0]) + String(configExist.start_of_work[1]));
                        start_minute = parseInt(String(configExist.start_of_work[3]) + String(configExist.start_of_work[4]));
                        end_hour = parseInt(String(configExist.end_of_work[0]) + String(configExist.end_of_work[1]));
                        scheduled_time_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]));
                        scheduled_time_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]));
                        if (scheduled_time_hour > start_hour && scheduled_time_hour < end_hour) {
                            openInThisTime = true;
                        }
                        else if (scheduled_time_hour === start_hour) {
                            if (scheduled_time_minute >= start_minute) {
                                openInThisTime = true;
                            }
                        }
                        if (!openInThisTime) {
                            throw new Error('O médico não está aberto nesse horário, tente outro!');
                        }
                        consultInThisTime = false;
                        return [4 /*yield*/, connection_1.connection('consults').select('scheduled_time').where('medic_id', medic_id).where('date', date)];
                    case 5:
                        consults = _b.sent();
                        consults.forEach(function (element) {
                            var existent_hour = parseInt(String(element.scheduled_time[0]) + String(element.scheduled_time[1]));
                            var existent_minute = parseInt(String(element.scheduled_time[3]) + String(element.scheduled_time[4]));
                            var scheduled_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]));
                            var scheduled_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]));
                            // If the exactly consult time is equal to the new consult time
                            if (element.scheduled_time === scheduled_time) {
                                consultInThisTime = true;
                            }
                            // If the hour is the same to the new consult time
                            if (existent_hour === scheduled_hour) {
                                consultInThisTime = true;
                            }
                            // If the new hour is in the next hour before old the consult ends
                            if (existent_hour + 1 === scheduled_hour && scheduled_minute < existent_minute) {
                                consultInThisTime = true;
                            }
                        });
                        if (consultInThisTime) {
                            throw new Error('O médico já possui uma consulta agendada nesse horário, tente outro!');
                        }
                        consult_id = uuid_1.v4();
                        // Creating consult
                        return [4 /*yield*/, connection_1.connection('consults').insert({
                                id: consult_id,
                                medic_id: medic_id,
                                patient_id: patient_id,
                                date: date,
                                scheduled_time: scheduled_time,
                                additional_info: additional_info
                            })];
                    case 6:
                        // Creating consult
                        _b.sent();
                        return [2 /*return*/, { id: consult_id }];
                }
            });
        });
    };
    // Get consult
    ConsultsService.prototype.getConsults = function (user_id, consultType) {
        return __awaiter(this, void 0, void 0, function () {
            var is_medic, consult, consult, consult;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').where('id', user_id).select('is_medic').first()
                        // Checking if user exists
                    ];
                    case 1:
                        is_medic = _a.sent();
                        // Checking if user exists
                        if (!is_medic) {
                            throw new Error('Esse usuário não existe!');
                        }
                        if (!is_medic.is_medic) return [3 /*break*/, 6];
                        if (!(consultType === 'confirmadas')) return [3 /*break*/, 3];
                        return [4 /*yield*/, connection_1.connection('consults').where('medic_id', user_id).where('confirmed', true).join('users', 'consults.patient_id', '=', 'users.id').select('consults.id', 'consults.confirmed', 'users.image_url', 'users.name', 'consults.additional_info', 'consults.date', 'consults.scheduled_time')];
                    case 2:
                        consult = _a.sent();
                        return [2 /*return*/, consult];
                    case 3: return [4 /*yield*/, connection_1.connection('consults').where('medic_id', user_id).where('confirmed', false).join('users', 'consults.patient_id', '=', 'users.id').select('consults.id', 'consults.confirmed', 'users.image_url', 'users.name', 'consults.additional_info', 'consults.date', 'consults.scheduled_time')];
                    case 4:
                        consult = _a.sent();
                        return [2 /*return*/, consult];
                    case 5: return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, connection_1.connection('consults').where('patient_id', user_id).join('users', 'consults.medic_id', '=', 'users.id').join('medics', 'consults.medic_id', '=', 'medics.user_id').join('specializations', 'medics.specialization_id', '=', 'specializations.id').select('consults.id', 'consults.confirmed', 'specializations.name as specialization', 'users.image_url', 'users.name', 'consults.additional_info', 'consults.date', 'consults.scheduled_time')];
                    case 7:
                        consult = _a.sent();
                        return [2 /*return*/, consult];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    // Edit consult
    ConsultsService.prototype.editConsultScheduledTime = function (_a) {
        var consult_id = _a.consult_id, user_id = _a.user_id, date = _a.date, scheduled_time = _a.scheduled_time;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, consultExists, userConsultExists, userConsultExists, openInThisDay, open_days, configExist, openInThisTime, start_hour, start_minute, end_hour, scheduled_time_hour, scheduled_time_minute, consultInThisTime, consults;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').where('id', user_id).select('is_medic').first()];
                    case 1:
                        userExists = _b.sent();
                        if (!userExists) {
                            throw new Error("Usuário inexistente!");
                        }
                        return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).select('*').first()];
                    case 2:
                        consultExists = _b.sent();
                        if (!consultExists) {
                            throw new Error("Consulta inexistente");
                        }
                        // Checking if the user is changing nothing
                        if (date === consultExists.date && consultExists.scheduled_time === scheduled_time) {
                            throw new Error("Não é possível alterar a consulta para o mesmo horário!");
                        }
                        if (!userExists.is_medic) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).where('medic_id', user_id).select('*').first()];
                    case 3:
                        userConsultExists = _b.sent();
                        if (!userConsultExists) {
                            throw new Error("Essa consulta não é sua!");
                        }
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).where('patient_id', user_id).select('*').first()];
                    case 5:
                        userConsultExists = _b.sent();
                        if (!userConsultExists) {
                            throw new Error("Essa consulta não é sua!");
                        }
                        _b.label = 6;
                    case 6:
                        openInThisDay = false;
                        return [4 /*yield*/, connection_1.connection('open_days').select('date').where('medic_id', consultExists.medic_id)];
                    case 7:
                        open_days = _b.sent();
                        open_days.forEach(function (element) {
                            if (element.date === date) {
                                openInThisDay = true;
                            }
                        });
                        if (!openInThisDay) {
                            throw new Error('O médico não está aberto nesse dia!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('*').where('medic_id', consultExists.medic_id).first()];
                    case 8:
                        configExist = _b.sent();
                        if (!configExist) {
                            throw new Error('Médico não criou configuração de consulta!');
                        }
                        openInThisTime = false;
                        start_hour = parseInt(String(configExist.start_of_work[0]) + String(configExist.start_of_work[1]));
                        start_minute = parseInt(String(configExist.start_of_work[3]) + String(configExist.start_of_work[4]));
                        end_hour = parseInt(String(configExist.end_of_work[0]) + String(configExist.end_of_work[1]));
                        scheduled_time_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]));
                        scheduled_time_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]));
                        if (scheduled_time_hour > start_hour && scheduled_time_hour < end_hour) {
                            openInThisTime = true;
                        }
                        else if (scheduled_time_hour === start_hour) {
                            if (scheduled_time_minute >= start_minute) {
                                openInThisTime = true;
                            }
                        }
                        if (!openInThisTime) {
                            throw new Error('O médico não está aberto nesse horário, tente outro!');
                        }
                        consultInThisTime = false;
                        return [4 /*yield*/, connection_1.connection('consults').select('scheduled_time', 'id').where('medic_id', consultExists.medic_id).where('date', date)];
                    case 9:
                        consults = _b.sent();
                        consults.forEach(function (element) {
                            var existent_hour = parseInt(String(element.scheduled_time[0]) + String(element.scheduled_time[1]));
                            var existent_minute = parseInt(String(element.scheduled_time[3]) + String(element.scheduled_time[4]));
                            var scheduled_hour = parseInt(String(scheduled_time[0]) + String(scheduled_time[1]));
                            var scheduled_minute = parseInt(String(scheduled_time[3]) + String(scheduled_time[4]));
                            // If the exactly consult time is equal to the new consult time
                            if (element.scheduled_time === scheduled_time && element.id !== consult_id) {
                                consultInThisTime = true;
                            }
                            // If the hour is the same to the new consult time
                            if (existent_hour === scheduled_hour && element.id !== consult_id) {
                                consultInThisTime = true;
                            }
                            // If the new hour is in the next hour before old the consult ends
                            if (existent_hour + 1 === scheduled_hour && scheduled_minute < existent_minute && element.id !== consult_id) {
                                consultInThisTime = true;
                            }
                        });
                        if (consultInThisTime) {
                            throw new Error('O médico já possui uma consulta agendada nesse horário, tente outro!');
                        }
                        if (!userExists.is_medic) return [3 /*break*/, 11];
                        return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).where('medic_id', user_id).update({
                                date: date,
                                scheduled_time: scheduled_time,
                                updated_at: getDateTime.stamp()
                            })];
                    case 10:
                        _b.sent();
                        return [3 /*break*/, 13];
                    case 11: return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).where('patient_id', user_id).update({
                            date: date,
                            scheduled_time: scheduled_time,
                            updated_at: getDateTime.stamp()
                        })];
                    case 12:
                        _b.sent();
                        _b.label = 13;
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    // Edit consult confirmation
    ConsultsService.prototype.editConsultConfirmation = function (_a) {
        var consult_id = _a.consult_id, medic_id = _a.medic_id, confirmation = _a.confirmation;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, consultExists, userConsultExists, configExist;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('medics').where('user_id', medic_id).select('specialization_id').first()];
                    case 1:
                        userExists = _b.sent();
                        if (!userExists) {
                            throw new Error("Médico inexistente!");
                        }
                        return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).select('*').first()];
                    case 2:
                        consultExists = _b.sent();
                        if (!consultExists) {
                            throw new Error("Consulta inexistente");
                        }
                        // Checking if the user is changing nothing
                        if (confirmation === consultExists.confirmed) {
                            throw new Error("Não é possível não mudar nada!");
                        }
                        return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).where('medic_id', medic_id).select('*').first()];
                    case 3:
                        userConsultExists = _b.sent();
                        if (!userConsultExists) {
                            throw new Error("Essa consulta não é sua!");
                        }
                        return [4 /*yield*/, connection_1.connection('consults_configurations').select('*').where('medic_id', consultExists.medic_id).first()];
                    case 4:
                        configExist = _b.sent();
                        if (!configExist) {
                            throw new Error('Médico não criou configuração de consulta!');
                        }
                        // Updating consult confirmation
                        return [4 /*yield*/, connection_1.connection('consults').where('id', consult_id).where('medic_id', medic_id).update({
                                confirmed: confirmation,
                                updated_at: getDateTime.stamp()
                            })];
                    case 5:
                        // Updating consult confirmation
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return ConsultsService;
}());
exports.ConsultsService = ConsultsService;
