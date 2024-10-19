import { Subject } from "rxjs";
import { DynamicButtonAction } from "../model/DynamicButtonAction";

export const actionService: IActionService = {
    actions$: new Subject(),
    setActions: function (actions:DynamicButtonAction[]): void {
        actionService.actions$.next(actions);
    }
};


interface IActionService {
    actions$: any;
    setActions(actions:DynamicButtonAction[]): void
};