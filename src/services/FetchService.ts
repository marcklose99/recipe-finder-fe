import axios from "axios";
import type { AxiosResponse } from "axios";
import type { IRecipe } from "@/data/IRecipe";

export default {
  async fetchMatches(): Promise<IRecipe[]> {
    return axios
      .get("http://localhost:8080/recipes")
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              "FetchService.ts no status case " + error.response.status
            );
            break;
        }
      });
  },
  async fetchImage(id: string): Promise<string> {
    return await axios
      .get(`http://localhost:8080/recipes/${id}/image`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        switch (error.response.status) {
          default:
            console.log(
              "FetchService.ts no status case " + error.response.status
            );
            break;
        }
      });
  },
};
