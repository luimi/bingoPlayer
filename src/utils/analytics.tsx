declare let gtag: any;

export const gaEvent = (name: string) => {
    gtag('event', name, {});
}