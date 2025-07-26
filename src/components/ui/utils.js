const rawData = [
    {
        class: {
            NDIFT: 'ND I FT',
            NDIPT: 'ND I PT',
            NDIIFT: 'ND II FT',
            NDIIPT: 'ND II PT',
            HNDIFT: 'HND I FT',
            HNDIIFT: 'HND II FT'
        },

        dpt: {
            COM: 'COM',
            SWD: 'SWD',
            CYS: 'CYS',
            AIT: 'AIT',
            NCC: 'NCC'
        },

        duration: [
            { value: "60", label: "1 hour" },
            { value: "120", label: "2 hours" },
            { value: "150", label: "2 hours 30 minutes" },
            { value: "200", label: "3 hours" },
            { value: "230", label: "3 hours 30 minutes" },
        ],

        venue: [
            { value: "ICE 01", label: "ICE 01" },
            { value: "ICE 02", label: "ICE 02" },
            { value: "ICE 03", label: "ICE 03" },
            { value: "ICE 04", label: "ICE 04" },
            { value: "ICE 05", label: "ICE 05" },
            { value: "ICE 06", label: "ICE 06" },
            { value: "ICE 07", label: "ICE 07" },
            { value: "ICE 08", label: "ICE 08" },
            { value: "ICE 09", label: "ICE 09" },
            { value: "ICE 10", label: "ICE 10" },
            { value: "MRM 01", label: "MRM 01" },
            { value: "MRM 02", label: "MRM 02" },
            { value: "MRM 03", label: "MRM 03" },
            { value: "MRM 04", label: "MRM 04" },
            { value: "MRM 05", label: "MRM 05" },
            { value: "MRM 06", label: "MRM 06" },
            { value: "MRM 07", label: "MRM 07" },
            { value: "MRM 08", label: "MRM 08" },
            { value: "MRM 09", label: "MRM 09" },
            { value: "IJMB HND LR 01", label: "IJMB HND LR 01" },
            { value: "IJMB HND LR 02", label: "IJMB HND LR 02" },
            { value: "IJMB HND LR 03", label: "IJMB HND LR 03" },
            { value: "IJMB HND LR 04", label: "IJMB HND LR 04" },
            { value: "Chemistry LAB", label: "Chemistry LAB" },
           
        ],

        lecturer: [
            { value: "Jimoh H.O", label: "Jimoh H.O" },
            { value: "Prof. Michael Chen", label: "Prof. Michael Chen" },
            { value: "Dr. (MRS) FA TAOFEEQ IBRAHIM", label: "Dr. (MRS) FA TAOFEEQ IBRAHIM" },
            { value: "Lawal Najeem", label: "Lawal Najeem" },
            { value: "Mr. Saliu O.N", label: "Mr. Saliu O.N" },
            { value: "Mr. Amari B.R", label: "Mr. Amari B.R" },
            { value: "Mr. Anifowose O.O", label: "Mr. Anifowose O.O" },
            { value: "Mr. Jimoh I.A", label: "Mr. Jimoh I.A" },
            { value: "Mrs Muhammed M.O", label: "Mrs Muhammed M.O" },
            { value: "Mr. Aliyu M.J", label: "Mr. Aliyu M.J" },
        ],

        tableTitle: [
            {label: 'Examination Details'},
            {label: 'Date & Time'},
            {label: 'Duration'},
            {label: 'Venue'},
            {label: 'Addtional Notes'},
            {label: 'Status'},
            {label: 'Actions'},
        ],

        tableTitle2: [
            {label: 'Examination Details'},
            {label: 'Date & Time'},
            {label: 'Duration'},
            {label: 'Venue'},
            {label: 'Addtional Notes'},
            {label: 'Status'},
        ]
    }
];

export default rawData;