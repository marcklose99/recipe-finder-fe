import axios from "axios";
import type {AxiosResponse} from "axios";
import type {IRecipe} from "@/data/IRecipe";

export default {
    /**
     *
     *
     * @return Promise<IRecipe[]>
     */
    async fetchMatches(): Promise<IRecipe[]>{
        return axios.get("http://localhost:8080/recipes")
            .then((response: AxiosResponse) => {
                return response.data
            })
            .catch((error) => {
                switch (error.response.status) {
                    default:
                        console.log(
                            'FetchService.ts no status case ' + error.response.status
                        )
                        break;
                }
            })
    },
}