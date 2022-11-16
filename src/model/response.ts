
export interface R<T>{
	code?: number;
	data?: T;
	message?: string;
}


export interface RList<T> {
	code?: number
	data?: T[]
	message?: string
}


export interface RPage<T> {
	code?:    number;
	data?:    Page<T>;
	message?: string;
}

/**
 * PageUser对象
 */
export interface Page<T> {
	countId?:                string;
	current?:                number;
	maxLimit?:               number;
	optimizeCountSql?:       boolean;
	optimizeJoinOfCountSql?: boolean;
	pages?:                  number;
	records?:                T[];
	searchCount?:            boolean;
	size?:                   number;
	total?:                  number;
}

