import axios, {AxiosResponse} from 'axios';
import { PostReissue } from '../user/postReissue';

const BASE_URL = 'https://www.codin.co.kr/api';

export const PostLike = async ( likeType:string, id:string): Promise<any> => {
    axios.defaults.withCredentials = true;
    try{
        
        const response: AxiosResponse<any> = await axios.post(
            `${BASE_URL}/likes`,
            {
                likeType : likeType,
                id: id
            },
          
        );
        console.log(response.data);
        return response.data;
      } catch (error: any) {
        if (error.response) {
          const { status, data } = error.response;
          console.error('Error response:', status, data);
         
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up request:', error.message);
        }
    
        throw error;
      }
}