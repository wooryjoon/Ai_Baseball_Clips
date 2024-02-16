import { useSelector } from 'react-redux';

export default function useGetRequestId() {
    return useSelector((state: any) => state.requestId.value);
}
