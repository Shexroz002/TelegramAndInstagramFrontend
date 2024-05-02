import React, {useEffect, useState} from 'react';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from "axios";
// import {colourOptions} from './data';


const animatedComponents = makeAnimated();

export default function MentionedUser(props) {
    const {get_value} = props
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/users/list/", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then((res) => {
                console.log(res.data);
                // Assuming setCustomers is a state setter function from useState hook
                setUsers(res.data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });

    }, []);
    return (
        <Select
            onChange={(e) => get_value(e)}
            placeholder={"Mentioned users"}
            closeMenuOnSelect={false}
            components={animatedComponents}
            defaultValue={[]}
            isMulti
            options={users.map((user) => {
                return {
                    value: user.id,
                    label: user.username,
                }
            })}
        />
    );
}