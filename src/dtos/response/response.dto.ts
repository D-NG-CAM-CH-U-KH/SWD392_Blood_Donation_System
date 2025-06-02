export default interface ResponseDto<TResponseDto> {
    status_code: number,
    is_success: boolean,
    message: string,
    reason: string,
    data: TResponseDto
}