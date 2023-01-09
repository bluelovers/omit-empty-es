export type Options = {
	omitZero: boolean;
};
export declare const omitEmpty: <Output, Input = unknown>(obj: Input, options?: Options) => Output;

export {
	omitEmpty as default,
};

export {};
