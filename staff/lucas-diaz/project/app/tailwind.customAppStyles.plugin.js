const plugin = require('tailwindcss/plugin')

export default plugin(({ addBase, addComponents, addUtilities, theme }) => {
    addBase({
        h1: {
            fontSize: theme('fontSize.4xl')
        }
    })

    addComponents({
        ".box-input": {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        ".form-button": {
            backgroundColor: "rgb(245,195,239)",
            color: "black",
            borderRadius: "1rem",
            border: "none",
            marginTop: "1.6rem",
            padding: ".4rem 3.5rem",
            fontWeight: "bold",
            cursor: "pointer"
        },
        ".edit-button": {
            height: "fit-content",
            borderRadius: "0.6rem",
            border: "none",
            backgroundColor: "rgb(28 28 28)",
            color: "white",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            alignSelf: "center",
            marginRight: "0.5rem"
        },
        ".home": {
            marginTop: "103px"
        },
        ".home-menu": {
            position: "fixed",
            top: "130px",
            left: "2vh",
            width: "90%",
            transform: "translateY(-40%)",
            opacity: "0",
            visibility: "hidden",
            transition: "all 400ms",
            margin: ".2rem"
        },
        ".footerArea": {
            position: "fixed",
            bottom: "0",
            left: "0",
            height: "8%",
            width: "100%",
            backgroundColor: "#1e3a3a",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
        }
    })

    addUtilities({
        '.content-hidden': {
            contentVisibility: 'hidden'
        },
        '.app-h1': {
            fontSize: theme('fontSize.4xl'),
            color: 'white',
            padding: '1rem',
            textAlign: "center",
            marginBottom: "1rem;"
        },
        '.helloworld--fluo': {
            backgroundColor: 'yellowgreen',
            color: 'greenyellow'
        },
        '.red': {
            color: "tomato"
        },
        '.green': {
            color: "#17AF96"
        },
        ".home-menu-transition": {
            opacity: "1",
            transform: "translateX(0%)",
            visibility: "visible"
        },
        ".pb-3-4": {
            paddingBottom: "75%"
        },
        ".material-symbols-rounded": {
            'font-variation-settings': "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 48",
            color: "rgb(223, 223, 223)",
            transition: "all 200ms",
            cursor: "pointer",
            alignSelf: "center",
            paddingLeft: ".5rem",
            paddingRight: ".5rem",
        },
        ".material-symbols-rounded-liked": {
            'font-variation-settings': "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
            color: "red",
            transition: "all 200ms",
        },
        ".filled": {
            'font-variation-settings': "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 48",
            transition: "all 200ms",
        },
        
    })
})