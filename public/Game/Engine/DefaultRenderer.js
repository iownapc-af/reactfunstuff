// eslint-disable-next-line import/no-anonymous-default-export
export default (entities, window) => {
  if (!entities || !window) return null;

  return Object.keys(entities)
    .filter((key) => entities[key].renderer)
    .map((key) => {
      const entity = entities[key];

      if (typeof entity.renderer === 'object') {
        // eslint-disable-next-line react/jsx-filename-extension
        return <entity.renderer.type key={key} window={window} {...entity} />;
      }
      if (typeof entity.renderer === 'function') {
        return <entity.renderer key={key} window={window} {...entity} />;
      }
    });
};
