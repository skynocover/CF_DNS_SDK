import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

const url = 'https://api.cloudflare.com/client/v4';

let zone_id: string | null = null;
let token: string | null = null;

/**
 * Init SDK
 * @param zoneID cloudflare zone_identifier
 * @param token cloudflare access token
 */
export const InitDNSSDK = (zoneID: string, Token: string) => {
  zone_id = zoneID;
  token = Token;
};

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
export const ListDNS = async ({
  match,
  name,
  order,
  page,
  per_page,
  content,
  type,
  proxied,
  direction,
}: listParams) => {
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

    const { data } = await axios({
      method: 'GET',
      url: `${url}/zones/${zone_id}/dns_records?${params.toString()}`,
      headers: { Authorization: 'Bearer ' + token },
    });

    if (!data.success) {
      return { errorMessages: data.messages };
    }

    return { result: data.result };
  } catch (error: any) {
    return { errorMessages: error.response?.data || error.message };
  }
};

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
export const CreateDNS = async ({
  name,
  content,
  type = 'A',
  ttl = 1,
  priority,
  proxied,
}: createParams) => {
  try {
    if (!zone_id || !token) {
      return { errorMessages: 'Please Init first' };
    }

    const { data } = await axios({
      method: 'POST',
      url: `${url}/zones/${zone_id}/dns_records`,
      headers: { Authorization: 'Bearer ' + token },
      data: { name, content, type, ttl, priority, proxied },
    });

    if (!data.success) {
      return { errorMessages: data.messages };
    }

    return data.result;
  } catch (error: any) {
    return { errorMessages: error.response?.data || error.message };
  }
};

/**
 * Get DNS record detail
 * @param id DNS record id
 */
export const DNSDetail = async (id: string) => {
  try {
    if (!zone_id || !token) {
      return { errorMessages: 'Please Init first' };
    }

    const { data } = await axios({
      method: 'GET',
      url: `${url}/zones/${zone_id}/dns_records/${id}`,
      headers: { Authorization: 'Bearer ' + token },
    });

    if (!data.success) {
      return { errorMessages: data.messages };
    }

    return data.result;
  } catch (error: any) {
    return { errorMessages: error.response?.data || error.message };
  }
};

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
export const UpdateDNS = async ({
  id,
  name,
  content,
  type = 'A',
  ttl = 1,
  proxied,
}: updateParams) => {
  try {
    if (!zone_id || !token) {
      return { errorMessages: 'Please Init first' };
    }

    const { data } = await axios({
      method: 'PATCH',
      url: `${url}/zones/${zone_id}/dns_records/${id}`,
      headers: { Authorization: 'Bearer ' + token },
      data: { name, content, type, ttl, proxied },
    });

    if (!data.success) {
      return { errorMessages: data.messages };
    }

    return data.result;
  } catch (error: any) {
    return { errorMessages: error.response?.data || error.message };
  }
};

/**
 * Delete DNS record
 * @param id DNS record id
 */
export const DeleteDNS = async (id: string) => {
  try {
    if (!zone_id || !token) {
      return { errorMessages: 'Please Init first' };
    }

    const { data } = await axios({
      method: 'DELETE',
      url: `${url}/zones/${zone_id}/dns_records/${id}`,
      headers: { Authorization: 'Bearer ' + token },
    });

    if (!data.success) {
      return { errorMessages: data.messages };
    }

    return data.result;
  } catch (error: any) {
    return { errorMessages: error.response?.data || error.message };
  }
};
