export default function dtm(target,key, descriptor) {

  const callback = descriptor.value;

  return {
    ...descriptor,
    value() {

      const args = arguments;

      console.warn('decorated');
      callback.apply(this, args);
    }
  }
}