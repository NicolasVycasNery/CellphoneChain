import {
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

export const menuState = atom({
    key: 'menuState', 
    default: false, 
});