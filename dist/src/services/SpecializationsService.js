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
exports.specializationsDB = void 0;
var uuid_1 = require("uuid");
var connection_1 = require("../database/connection");
var SpecializationsDB = /** @class */ (function () {
    // Initialing the constructor to set specializations inside class
    function SpecializationsDB(specializations) {
        this.specializations = specializations;
    }
    // Function to init db to default specializations state
    SpecializationsDB.prototype.initDB = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < this.specializations.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, connection_1.connection('specializations').insert({
                                id: uuid_1.v4(),
                                name: specializations[i]
                            })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, true];
                }
            });
        });
    };
    // Creating a new specialization after init db
    SpecializationsDB.prototype.newSpecialization = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('specializations').insert({
                            id: uuid_1.v4(),
                            name: name
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Get all specializations
    SpecializationsDB.prototype.getSpecializations = function () {
        return __awaiter(this, void 0, void 0, function () {
            var specializations;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('specializations').select('*')];
                    case 1:
                        specializations = _a.sent();
                        return [2 /*return*/, specializations];
                }
            });
        });
    };
    // Get specialization by name
    SpecializationsDB.prototype.getSpecializationIdByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var specialization_id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('specializations').select('id').where('name', name).first()];
                    case 1:
                        specialization_id = _a.sent();
                        return [2 /*return*/, specialization_id === null || specialization_id === void 0 ? void 0 : specialization_id.id];
                }
            });
        });
    };
    return SpecializationsDB;
}());
// Specializations
var specializations = [
    'Alergia e imunologia',
    'Anestesiologia',
    'Cardiologia',
    'Cirurgia geral',
    'Clínica médica',
    'Dermatologia',
    'Endocrinologia',
    'Endoscopia',
    'Gastroenterologia',
    'Geriatria',
    'Ginecologia e obstetrícia',
    'Hematologia e hemoterapia',
    'Infectologia',
    'Medicina',
    'Medicina do trabalho',
    'Medicina intensiva',
    'Medicina legal e perícia médica',
    'Nefrologia',
    'Neurocirurgia',
    'Neurologia',
    'Nutrologia',
    'Oftalmologia',
    'Oncologia',
    'Ortopedia e traumatologia',
    'Otorrinolaringologia',
    'Patologia',
    'Pediatria',
    'Pneumologia',
    'Psiquiatria',
    'Reumatologia',
    'Urologia'
];
var specializationsDB = new SpecializationsDB(specializations);
exports.specializationsDB = specializationsDB;
