import { PropsType } from "../../../../shared/types";


export class ComponentInputMissingError extends Error {
  constructor(
    readonly name: string, 
    readonly props: PropsType<any> | undefined,
    ) {
    super(`Input ${name} is missing from component props: ${props}`);
  }
}