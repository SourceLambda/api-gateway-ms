import { generalRequest } from "../utilities";
import { generalRequest as generalRequestPost} from "../post_ms/utilities_post_ms";
import {url, port, entryPoint} from './server';
import {host, port as post_port, postsEntryPoint, categoriesEntryPoint} from '../post_ms/server'

const URL = `http://${url}:${port}/${entryPoint}`;
const post_URL = `http://${host}:${post_port}`

const resolvers = {
    Query: {
        browse: async (_, {q}) => {

            let searchedPostsIds = await generalRequest(`${URL}/search?q=${q}`, 'GET')

			let postsToSort = []
            let postIndex = new Object()


            for (let index = 0; index < searchedPostsIds.length; index++) {

                const id = searchedPostsIds[index]

                let post = await generalRequestPost(`${post_URL}/${postsEntryPoint}/${id}`, 'GET')
                let categories = await generalRequestPost(`${post_URL}/${categoriesEntryPoint}`, 'GET')

                let category = ""

                for (let index = 0; index < categories.length; index++) {
                    const element = categories[index];
                    if(post.CategoryID == element.ID) category = element.Name
                    
                }

                postIndex[id] = post

                postsToSort.push({
                    id : id,
                    title : post.Title,
                    desc : makeDesc(post.Description),
                    category : category,
                    views : post.Views,
                    rating : post.Num_ratings != 0 ? post.Sum_ratings / post.Num_ratings : 0.0 

                })
                
            }

            let sortedResult = await generalRequest(`${URL}/sort?q=${q}`, 'POST', postsToSort)

            let finalSortedPosts = []
            for(let index = 0; index < sortedResult.length; index++){
                const id = sortedResult[index].id
                finalSortedPosts.push(postIndex[id])
            }

            return finalSortedPosts
        }
    }
}

function makeDesc(description){

    let desc = ""
    desc += description.Description_text
    desc += description.Brand

    for(let i=0; i < description.Tech_details.length; i++){
        desc += " " + description.Tech_details[i]
    }
    for(let i=0; i < description.Other_details.length; i++){
        desc += " " + description.Other_details[i]
    }

    return desc

}

export default resolvers;