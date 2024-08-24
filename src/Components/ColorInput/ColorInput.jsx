import useLocalStorageState from "use-local-storage-state";

export default function ColorInput({ id, defaultValue }) {
  const [inputValue, setInputValue] = useLocalStorageState(`inputValue-${id}`, {
    defaultValue: defaultValue,
  });

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputValue}
      />
      <input type="color" value={inputValue} onChange={handleInputValue} />
    </>
  );
}
