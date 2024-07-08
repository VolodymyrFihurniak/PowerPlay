interface DBMapper<D, E> {
  toDomain(entity: D): E;
  toEntity(domain: E): D;
}

export { DBMapper };
