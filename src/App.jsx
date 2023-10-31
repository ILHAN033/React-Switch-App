import { useState } from "react";
import { motion } from "framer-motion";

const tasks = [
  {
    id: 2,
    item: "banana",
    checked: false,
    disabled: true,
  },
  { id: 4, item: "Apple", checked: false, disabled: true },
];

function App() {
  const [items1, setItems1] = useState(tasks);
  const [items2, setItems2] = useState(tasks);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 gap-2">
      <h1 class="text-6xl font-bold text-white text-center p-18">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          React
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <h3 className="my-futuristic-text-1">Switch</h3>
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          App
        </motion.span>
      </h1>

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
  );
}

function Form({ input, setInput, setItems, items }) {
  function handleAdd() {
    if (!input) return;
    const newItem = {
      id: Date.now(),
      item: input,
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

  return (
    <div className="bg-gradient-to-r from-orange-400 via-blue-300 to-blue-400 text-white p-8 rounded-lg shadow-xl">
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
        <button className="px-6 py-3 text-white bg-gradient-to-r from-purple-700 to-blue-600 rounded-half hover:scale-105 transform transition-transform ease-in-out duration-300">
          add
        </button>
      </form>
      <Display items={items} onToggle={checked} />
    </div>
  );
}

function Display({ items, onToggle }) {
  return (
    <ul>
      {items?.map((item) => (
        <li key={item.id} className={item.disabled ? "disabled" : "flex gap-2"}>
          <span style={item.checked ? { textDecoration: "line-through" } : {}}>
            {!item.disabled ? (
              <input
                type="checkbox"
                value={item.checked}
                onChange={() => onToggle(item.id)}
              />
            ) : null}

            {item.item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function Switch({ items1, items2, setItems1, setItems2 }) {
  return (
    <div className="flex gap-2">
      <button
        className="relative w-16 h-8 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full"
        onClick={() =>
          items2.map((item, i) =>
            item.checked === true
              ? (setItems1((itm) => [
                  ...itm,
                  { id: item.id, item: item.item, checked: !item.checked },
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
                  { id: item.id, item: item.item, checked: !item.checked },
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
