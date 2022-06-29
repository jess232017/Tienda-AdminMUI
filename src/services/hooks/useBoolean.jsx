import { useState } from "react";

const useBoolean = (initial = false) => {
    const [value, setValue] = useState(initial);

    const actions = {
        set: (value) => setValue(Boolean(value)),
        toggle: () => setValue((value) => !value),
        on: () => setValue(true),
        off: () => setValue(false),
    };

    return [value, actions];
};

export default useBoolean;