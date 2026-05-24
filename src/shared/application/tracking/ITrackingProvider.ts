export interface NormalizedEvent {
    event_name:
        | 'PageView'
        | 'ViewContent'
        | 'ScrollDepth'
        | 'Lead'
        | 'InitiateCheckout'
        | 'Contact'
        | 'CustomEvent';
    event_id: string;
    event_source_url: string;
    client_ip_address: string;
    client_user_agent: string;
    fbp?: string;
    fbc?: string;
    gclid?: string;
    scroll_depth?: number;
    product?: {
        content_id: string;
        title: string;
        category: string | null;
        priceEstimate: number | null;
        currency: string;
    };
}

export interface ProviderResult {
    provider: string;
    success: boolean;
    trace_id?: string;
}

export interface ITrackingProvider {
    name: string;
    isEnabled(): boolean;
    normalize(event: NormalizedEvent): any;
    sendEvent(event: NormalizedEvent): Promise<ProviderResult>;
}
