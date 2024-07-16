"use client";

import React, { useState, useEffect } from 'react'
 
export default function Form() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState(null)
    
    async function onSubmit(event) {
        event.preventDefault()
        setIsLoading(true)
        setError(null) // Clear previous errors when a new request starts
    
        try {
            const formData = new FormData(event.currentTarget)
            // const response = await fetch(`${process.env.API_URL}` + '/submit', {
            const response = await fetch('http://localhost:3000/submit', {
                mode:'cors',
                method: 'POST',
                body: formData,
            })
    
            if (!response.ok) {
                throw new Error('Failed to submit the data. Please try again.')
            }
    
            // Handle response if necessary
            const jsondata = await response.json()
            console.log(jsondata)

            const responseData = Object.values(jsondata);
            //                  or
            // for (const [key, item] of Object.entries(jsondata))    {
            //     responseData.push(item)
            // }

            setData(responseData.join(' '))

        } catch (error) {
            // Capture the error message to display to the user
            setError(error.message)
        } finally {
            setIsLoading(false)
        }
    }
 
    return (
        <div className="w-full">
            <form onSubmit={onSubmit} className="w-full max-w-4xl">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="input">
                            Input
                        </label>
                        <div className="flex items-center">
                            <input className="appearance-none block w-3/6 text-gray-700 border border-gray-200 rounded py-3 px-4 mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="input" placeholder="Enter anything" />
                            <input className="appearance-none block w-3/6 text-gray-700 border border-gray-200 rounded py-3 px-4 mr-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text" name="input2" placeholder="Enter anything" />
                            <button type="submit" disabled={isLoading} className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-400 text-white w-1/6 font-bold py-2 px-4 rounded">
                                {isLoading ? 'Loading...' : 'Submit'}
                            </button>
                        </div>

                        {error && <p className="ml-1 mt-1 text-red-600 text-xs">{error}</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    Input: {data}
                </div>
            </form>
        </div>
    )
}