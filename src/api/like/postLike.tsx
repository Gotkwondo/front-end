import axios, {AxiosResponse} from 'axios';
import { PostReissue } from '../user/postReissue';

const BASE_URL = 'https://www.codin.co.kr/api';

export const PostLike = async ( likeType:string, id:string): Promise<any> => {
    axios.defaults.withCredentials = true;
    const accessToken = localStorage.getItem("accessToken");
    try{
        
        const response: AxiosResponse<any> = await axios.post(
            `${BASE_URL}/likes`,
            {
                likeType : likeType,
                id: id
            },
           { headers: {
             Authorization: ` ${accessToken}`
          }},
        );
        console.log('토큰:', accessToken);
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
          console.error('Error response:', status, data);
          if (status === 401){
            console.error('401 Unauthorized: 토큰이 유효하지 않거나 만료되었습니다.');
            const refreshToken = localStorage.getItem('refresh-token');
            localStorage.setItem('accessToken', refreshToken);
            PostLike(likeType, id);

          }
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
    
        throw error;
      }
}