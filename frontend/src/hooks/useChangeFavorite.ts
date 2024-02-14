import { requestFavorite } from '@/api/requestFavorite';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useChangeFavorite = () => {
    const queryClient = useQueryClient();
    const queryKey = ['teamInfoByInnings'];
    const { mutate: changeFavoriteState } = useMutation({
        mutationFn: (batId: number) => requestFavorite({ batId }),
        onMutate: async (batId) => {
            // 선택지 데이터에 대한 모든 쿼리요청을 취소하여 이전 서버 데이터가 낙관업데이트를 막지 못하게 하기.
            await queryClient.cancelQueries({ queryKey: queryKey });
            const previousData = queryClient.getQueryData(queryKey); // 스냅샷
            console.log(previousData);
            queryClient.setQueryData(queryKey, batId); // 낙관적 업데이트
            return { previousData };
        },
        onError: (error, _, context) => {
            queryClient.setQueryData(queryKey, context?.previousData);
        },
        onSettled: (batId) => {
            queryClient.invalidateQueries({ queryKey: queryKey });
        },
    });
    return changeFavoriteState;
};
export default useChangeFavorite;
