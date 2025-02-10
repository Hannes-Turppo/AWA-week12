import { useState } from "react"
import {Box, TextField, Button} from "@mui/material"


const createBook = async (author: string, name: string, pages: string) => {
    let success: boolean = false

    try {
        const pagesAsInt: number = parseInt(pages)

        const res = await fetch("/api/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                author: author,
                name: name,
                pages: pagesAsInt
            })
        })

        console.log(await res.json())
        if (res.ok) {
            success = true
        }


    } catch (error: any) {
        console.error(`Error submitting book: ${error}`)
    }

    return success
}

function CreateBook() {
    const [author, setAuthor] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [pages, setPages] = useState<string>("")


    const handleSubmit = async () => {
        const success: boolean = await createBook(author, name, pages)

        if (!success) {
            console.log("submission failed")
        } else {
            console.log("submission succesful")
        }
    }

      return (
        <>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    background: "white",
                    borderRadius: 3,
                }}>
                <TextField id="author" label="Author" onChange={(e) => setAuthor(e.target.value)}/>
                <TextField id="name" label="Book name" onChange={(e) => setName(e.target.value)}/>
                <TextField id="pages" label="pages" type="Number" onChange={(e) => setPages(e.target.value)}/>
                <Button id="submit" onClick={handleSubmit}>Create book</Button>
            </Box>
        </>
  )
}
export default CreateBook