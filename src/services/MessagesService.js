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
exports.MessagesService = void 0;
var connection_1 = require("../database/connection");
var uuid_1 = require("uuid");
var MessagesService = /** @class */ (function () {
    function MessagesService() {
    }
    MessagesService.prototype.createMessage = function (_a) {
        var consult_id = _a.consult_id, sender_id = _a.sender_id, text = _a.text;
        return __awaiter(this, void 0, void 0, function () {
            var userExists, consultExists, id;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').select('*').where('id', sender_id).first()];
                    case 1:
                        userExists = _b.sent();
                        if (!userExists) {
                            throw new Error('Esse usuário não existe!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults').select('*').where('id', consult_id).where(userExists.is_medic ? 'medic_id' : 'patient_id', sender_id).first()];
                    case 2:
                        consultExists = _b.sent();
                        if (!consultExists) {
                            throw new Error('Essa consulta não existe ou não é sua!');
                        }
                        id = uuid_1.v4();
                        return [4 /*yield*/, connection_1.connection('messages').insert({
                                id: id,
                                consult_id: consult_id,
                                sender_id: sender_id,
                                text: text
                            })];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, id];
                }
            });
        });
    };
    MessagesService.prototype.getMessages = function (consult_id, sender_id) {
        return __awaiter(this, void 0, void 0, function () {
            var userExists, consultExists, messages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, connection_1.connection('users').select('*').where('id', sender_id).first()];
                    case 1:
                        userExists = _a.sent();
                        if (!userExists) {
                            throw new Error('Esse usuário não existe!');
                        }
                        return [4 /*yield*/, connection_1.connection('consults').select('*').where('id', consult_id).where(userExists.is_medic ? 'medic_id' : 'patient_id', sender_id).first()];
                    case 2:
                        consultExists = _a.sent();
                        if (!consultExists) {
                            throw new Error('Essa consulta não existe ou não é sua!');
                        }
                        return [4 /*yield*/, connection_1.connection('messages').join('users', 'messages.sender_id', 'users.id').where('consult_id', consult_id).select('messages.id', 'messages.consult_id', 'messages.sender_id', 'users.name', 'messages.text')];
                    case 3:
                        messages = _a.sent();
                        return [2 /*return*/, messages];
                }
            });
        });
    };
    return MessagesService;
}());
exports.MessagesService = MessagesService;
