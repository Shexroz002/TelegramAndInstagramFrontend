import React, { useState, useEffect } from "react";
import { Mention } from 'primereact/mention';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import './flags.css';
import axios from "axios";
export default function Templates() {
    const [value, setValue] = useState('');
    const [customers, setCustomers] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users/list/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res.data);
                // Assuming setCustomers is a state setter function from useState hook
                setCustomers(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

    }, []);
    const onSearch = (event) => {
        //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
        setTimeout(() => {
            const query = event.query;
            let suggestions;

            if (!query.trim().length) {
                suggestions = [...customers];

            }
            else {
                suggestions = customers.filter((customer) => {
                    return customer.username.toLowerCase().startsWith(query.toLowerCase());
                });
            }
            console.log(suggestions,query,"sad")
            setSuggestions(suggestions);
        }, 250);
    }

    const itemTemplate = (suggestion) => {
        const src = `http://127.0.0.1:8000${suggestion.user_image}`;

        return (
            <div className="flex align-items-center" style={{marginTop:"10px"}}>
                <img alt={suggestion.name} src={src} style={{width:"32px", height:"32px"}} />
                <span className="flex flex-column ml-3">

                    <small style={{ fontSize: '.75rem', color: 'var(--text-color-secondary)' }}>@{suggestion.username}</small>
                </span>
            </div>
        );
    }
    console.log(value)

    return (
            <div style={{width:"90%",margin:"10px"}}>
                <Mention value={value} onChange={(e) => {
                    setValue(e.target.value);console.log(e.target)
                }} suggestions={suggestions} onSearch={onSearch} field="username"
                         placeholder="Enter @ to mention people" rows={5} cols={40} itemTemplate={itemTemplate} />
            </div>


    )
}
