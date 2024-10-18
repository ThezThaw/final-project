import { Subject } from "rxjs";

export const loadingService: ILoadingService = {
    isLoading$: new Subject(),
    setLoading: function(loading: boolean): void {
        loadingService.isLoading$.next(loading);
    },

    isButtonBusy$: new Subject(),
    setButtonBusy: function(isButtonBusy: boolean): void {
        loadingService.isButtonBusy$.next(isButtonBusy);
    }
};


interface ILoadingService {
    isLoading$: Subject<boolean>;
    setLoading(loading:boolean): void;

    isButtonBusy$: Subject<boolean>;
    setButtonBusy(isButtonBusy:boolean): void
};