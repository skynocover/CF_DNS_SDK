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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteDNS = exports.UpdateDNS = exports.DNSDetail = exports.CreateDNS = exports.ListDNS = exports.InitDNSSDK = void 0;
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.headers.common['Content-Type'] = 'application/json';
const url = 'https://api.cloudflare.com/client/v4';
let zone_id = null;
let token = null;
/**
 * Init SDK
 * @param zoneID cloudflare zone_identifier
 * @param token cloudflare access token
 */
const InitDNSSDK = (zoneID, Token) => {
    zone_id = zoneID;
    token = Token;
};
exports.InitDNSSDK = InitDNSSDK;
/**
 * List DNS record
 * @param match all: all search requirements, any: at least one
 * @param name DNS record name
 * @param content DNS record content
 * @param order Field to order records by
 * @param page Page number of paginated results, default: 1
 * @param per_page Number of DNS records per page, default: 20
 * @param type DNS record type
 * @param proxied DNS record proxied status
 * @param direction Direction to order domains
 */
const ListDNS = ({ match, name, order, page, per_page, content, type, proxied, direction, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!zone_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        let params = new URLSearchParams();
        match && params.append('match', match);
        name && params.append('name', name);
        order && params.append('order', order);
        page && params.append('page', page.toString());
        per_page && params.append('per_page', per_page.toString());
        content && params.append('match', content);
        type && params.append('match', type);
        proxied && params.append('match', `${proxied}`);
        direction && params.append('match', direction);
        const { data } = yield axios_1.default({
            method: 'GET',
            url: `${url}/zones/${zone_id}/dns_records?${params.toString()}`,
            headers: { Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return { result: data.result };
    }
    catch (error) {
        return { errorMessages: ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message };
    }
});
exports.ListDNS = ListDNS;
/**
 * Create DNS record
 * @param name DNS record name
 * @param content DNS record content
 * @param type DNS record type, default: A
 * @param ttl Time to live, in seconds. Must be between 60 and 86400, or 1 for 'automatic', default: 1
 * @param priority Required for MX, SRV and URI records; unused by other record types
 * @param proxied Whether the record is receiving the performance and security benefits of Cloudflare
 */
const CreateDNS = ({ name, content, type = 'A', ttl = 1, priority, proxied, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        if (!zone_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield axios_1.default({
            method: 'POST',
            url: `${url}/zones/${zone_id}/dns_records`,
            headers: { Authorization: 'Bearer ' + token },
            data: { name, content, type, ttl, priority, proxied },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return { result: data.result };
    }
    catch (error) {
        return { errorMessages: ((_b = error.response) === null || _b === void 0 ? void 0 : _b.data) || error.message };
    }
});
exports.CreateDNS = CreateDNS;
/**
 * Get DNS record detail
 * @param id DNS record id
 */
const DNSDetail = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        if (!zone_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield axios_1.default({
            method: 'GET',
            url: `${url}/zones/${zone_id}/dns_records/${id}`,
            headers: { Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return data.result;
    }
    catch (error) {
        return { errorMessages: ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message };
    }
});
exports.DNSDetail = DNSDetail;
/**
 * Create DNS record
 * @param id DNS record id
 * @param name DNS record name
 * @param content DNS record content
 * @param type DNS record type, default: A
 * @param ttl Time to live, in seconds. Must be between 60 and 86400, or 1 for 'automatic', default: 1
 * @param proxied Whether the record is receiving the performance and security benefits of Cloudflare
 */
const UpdateDNS = ({ id, name, content, type = 'A', ttl = 1, proxied, }) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        if (!zone_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield axios_1.default({
            method: 'PATCH',
            url: `${url}/zones/${zone_id}/dns_records/${id}`,
            headers: { Authorization: 'Bearer ' + token },
            data: { name, content, type, ttl, proxied },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return { result: data.result };
    }
    catch (error) {
        return { errorMessages: ((_d = error.response) === null || _d === void 0 ? void 0 : _d.data) || error.message };
    }
});
exports.UpdateDNS = UpdateDNS;
/**
 * Delete DNS record
 * @param id DNS record id
 */
const DeleteDNS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        if (!zone_id || !token) {
            return { errorMessages: 'Please Init first' };
        }
        const { data } = yield axios_1.default({
            method: 'DELETE',
            url: `${url}/zones/${zone_id}/dns_records/${id}`,
            headers: { Authorization: 'Bearer ' + token },
        });
        if (!data.success) {
            return { errorMessages: data.messages };
        }
        return { result: data.result };
    }
    catch (error) {
        return { errorMessages: ((_e = error.response) === null || _e === void 0 ? void 0 : _e.data) || error.message };
    }
});
exports.DeleteDNS = DeleteDNS;
