import { debounce } from 'lodash';
import { useRef } from "react";

export default function useDebouncedInput (fn: (event: any) => void ,delay: number) {
    return useRef(
        debounce((event: any) => {
            fn(event)
        }, delay)
    ).current;
}