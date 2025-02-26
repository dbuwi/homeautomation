import {defineStore} from 'pinia'
import {ref} from 'vue'


export const useAppStore =  defineStore('app', ()=>{

    const setPasscode = async (passcode) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        // console.log(passcode);
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const form = new FormData(); // Create form
        form.append("passcode", passcode); // Add variable to form
        console.log(form)
        const URL = `/api/set/combination/`;
        try {
            const response = await fetch(URL, { method: 'POST', signal: signal,body: form, });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "complete") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("setPasscode returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {
            console.error('setPasscode error: ', err.message);
        }
        return []
    }


    const updateCard = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/avg/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("updateCard returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {

            console.error('updateCard error:', err.message);
        }
        return []
    }

    const getReserve = async (start, end) => {
        // FETCH REQUEST WILL TIMEOUT AFTER 20 SECONDS
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => { controller.abort() }, 60000);
        const URL = `/api/reserve/${start}/${end}`;
        try {
            const response = await fetch(URL, { method: 'GET', signal: signal });
            if (response.ok) {
                const data = await response.json();
                let keys = Object.keys(data);
                if (keys.includes("status")) {
                    if (data["status"] == "found") {
                        console.log(data["data"]);
                        return data["data"];
                    }
                    if (data["status"] == "failed"
                    ) {
                        console.log("getReserve returned no data");
                    }
                }
            }
            else {
                const data = await response.text();
                console.log(data);
            }
        }
        catch (err) {

            console.error('getReserve error:', err.message);
        }
        return []
    }

    return { 
    // EXPORTS	
        setPasscode,
        updateCard,
        getReserve 
        
       }
},{ persist: true  });