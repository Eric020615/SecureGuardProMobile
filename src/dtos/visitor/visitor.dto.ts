import { VisitorEnum } from "@config/constant/visitor";

export interface CreateVisitorDto {
	visitorName: string
	visitorCategory: VisitorEnum
	visitorContactNumber: string
	visitDateTime: string
}

export interface EditVisitorByIdDto {
    visitorName: string;
    visitorCategory: string;
    visitorContactNumber: string;
    visitDateTime: string;
}

export interface GetVisitorDto {
    visitorId: number;
    visitorGuid: string;
    visitorName: string;
    visitorCategory: string;
    visitorContactNumber: string;
    visitDateTime: string;
    status: string,
}

export interface GetVisitorDetailsDto {
    visitorId: number;
    visitorGuid: string;
    visitorName: string;
    visitorCategory: string;
    visitorContactNumber: string;
    visitDateTime: string;
    status: string,
    createdBy: string;
    updatedBy: string;
    createdDateTime: string;
    updatedDateTime: string;
}