/**
 * Init SDK
 * @param zoneID cloudflare zone_identifier
 * @param token cloudflare access token
 */
export declare const InitDNSSDK: (zoneID: string, Token: string) => void;
interface listParams {
    match?: 'all' | 'any';
    name?: string;
    order?: 'type' | 'name' | 'content' | 'ttl' | 'proxied';
    page?: number;
    per_page?: number;
    content?: string;
    type?: string;
    proxied?: boolean;
    direction?: 'asc' | 'desc';
}
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
export declare const ListDNS: ({ match, name, order, page, per_page, content, type, proxied, direction, }: listParams) => Promise<{
    errorMessages: any;
    result?: undefined;
} | {
    result: any;
    errorMessages?: undefined;
}>;
interface createParams {
    name: string;
    content: string;
    type?: string;
    ttl?: number;
    priority?: number;
    proxied?: boolean;
}
/**
 * Create DNS record
 * @param name DNS record name
 * @param content DNS record content
 * @param type DNS record type, default: A
 * @param ttl Time to live, in seconds. Must be between 60 and 86400, or 1 for 'automatic', default: 1
 * @param priority Required for MX, SRV and URI records; unused by other record types
 * @param proxied Whether the record is receiving the performance and security benefits of Cloudflare
 */
export declare const CreateDNS: ({ name, content, type, ttl, priority, proxied, }: createParams) => Promise<{
    errorMessages: any;
    result?: undefined;
} | {
    result: any;
    errorMessages?: undefined;
}>;
/**
 * Get DNS record detail
 * @param id DNS record id
 */
export declare const DNSDetail: (id: string) => Promise<any>;
interface updateParams {
    id: string;
    name?: string;
    content?: string;
    type?: string;
    ttl?: number;
    proxied?: boolean;
}
/**
 * Create DNS record
 * @param id DNS record id
 * @param name DNS record name
 * @param content DNS record content
 * @param type DNS record type, default: A
 * @param ttl Time to live, in seconds. Must be between 60 and 86400, or 1 for 'automatic', default: 1
 * @param proxied Whether the record is receiving the performance and security benefits of Cloudflare
 */
export declare const UpdateDNS: ({ id, name, content, type, ttl, proxied, }: updateParams) => Promise<{
    errorMessages: any;
    result?: undefined;
} | {
    result: any;
    errorMessages?: undefined;
}>;
/**
 * Delete DNS record
 * @param id DNS record id
 */
export declare const DeleteDNS: (id: string) => Promise<{
    errorMessages: any;
    result?: undefined;
} | {
    result: any;
    errorMessages?: undefined;
}>;
export {};
