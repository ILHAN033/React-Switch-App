import { useState } from "react";

const tasks = [
  {
    id: 2,
    name: "banana",
    checked: false,
    disabled: true,
  },
  { id: 4, name: "Apple", checked: false, disabled: true },
];

function App() {
  const [items1, setItems1] = useState(tasks);
  const [items2, setItems2] = useState(tasks);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500 gap-10 ">
      <div className="container">
        <p className="text">React Switch App</p>
      </div>

      <div className="flex gap-5">
        <Form
          items={items1}
          input={input1}
          setItems={setItems1}
          setInput={setInput1}
        />
        <Switch
          items1={items1}
          setItems1={setItems1}
          setInput1={setInput1}
          items2={items2}
          setItems2={setItems2}
          setInput2={setInput2}
        />
        <Form
          items={items2}
          input={input2}
          setItems={setItems2}
          setInput={setInput2}
        />
      </div>
    </div>
  );
}

function Form({ input, setInput, setItems, items }) {
  function handleAdd() {
    if (!input) return;
    const newItem = {
      id: Date.now(),
      name: input,
      checked: false,
      disabled: false,
    };
    setItems((items) => [...items, newItem]);
    setInput("");
    console.log(items);
  }

  function checked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  return (
    <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white p-8 rounded-lg shadow-xl">
      <form
        className="flex justify-center mt-5 gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          handleAdd(input);
        }}
      >
        <input
          className="p-4 w-48 bg-gradient-to-r from-purple-700 to-blue-600 text-white placeholder-gray-200 border-2 border-transparent focus:outline-none focus:border-blue-500 rounded-lg shadow-md hover:shadow-lg"
          placeholder="Add Item.."
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            console.log(input);
          }}
        />
        <button className="px-6 py-3 text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded-full hover:scale-105 transform transition-transform ease-in-out duration-300">
          add
        </button>
      </form>
      <Display items={items} onToggle={checked} onDelete={handleDelete} />
    </div>
  );
}

function Display({ items, onToggle, onDelete }) {
  return (
    <ul className="flex flex-col gap-2">
      {items?.map((item) => (
        <li
          key={item.id}
          className={item.disabled ? "disabled" : "flex  justify-between"}
        >
          <span style={item.checked ? { textDecoration: "line-through" } : {}}>
            {!item.disabled ? (
              <input
                type="checkbox"
                value={item.checked}
                onChange={() => onToggle(item.id)}
              />
            ) : null}

            {item.name}
          </span>
          {item.disabled ? null : (
            <button
              className="rounded-lg bg-gradient-to-r from-red-700 to-orange-600 w-14 hover:scale-105 transform transition-transform ease-in-out duration-300"
              onClick={() => onDelete(item.id)}
            >
              delete
            </button>
          )}
        </li>
      ))}
    </ul>
  );
}

function Switch({ items1, items2, setItems1, setItems2 }) {
  return (
    <div className="flex gap-2 items-center">
      <button
        className="relative w-16 h-8 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full"
        onClick={() =>
          items2.map((item, i) =>
            item.checked
              ? (setItems1((itm) => [
                  ...itm,
                  { id: item.id, name: item.name, checked: !item.checked },
                ]),
                items2.splice(i, 1))
              : null
          )
        }
      >
        ⬅️
      </button>

      <button
        className="relative w-16 h-8 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full"
        onClick={() =>
          items1.map((item, i) =>
            item.checked
              ? (setItems2((itm) => [
                  ...itm,
                  { id: item.id, name: item.name, checked: !item.checked },
                ]),
                items1.splice(i, 1))
              : item
          )
        }
      >
        ➡️
      </button>
    </div>
  );
}

export default App;
