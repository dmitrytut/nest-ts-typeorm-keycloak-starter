/**
 * Mapper Interface.
 *
 * @template TEntity Entity type.
 * @template TDto DTO type.
 * @template TResponseDto Option. Response DTO type. Default TDto.
 */
export interface IMapper<TEntity, TDto, TResponseDto = TDto> {
    /**
     * DTO to domain entity mapping method.
     *
     * @param dto DTO object.
     * @param args Additional arguments.
     *
     * @returns Domain entity.
     */
    toEntity?(dto: TDto, ...args: unknown[]): TEntity;
    /**
     * Метод приведения доменной сущности к DTO для ответа.
     *
     * @param entity Domain entity object.
     * @param args Additional arguments.
     *
     * @returns Response DTO object.
     */
    toDto?(entity: TEntity, ...args: unknown[]): TResponseDto;
}
