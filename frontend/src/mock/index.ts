import worker from './Browser';
const initMockAPI = async (): Promise<void> => {
    if (import.meta.env.VITE_ENV === 'development') {
        worker.start();
    }
};
export default initMockAPI;
