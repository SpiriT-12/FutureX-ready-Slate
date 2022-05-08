module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/flowbite/**/*.js'],
   theme: {
      extend: {
         fontFamily: {
            ubuntu: ["'Ubuntu', sans-serif"],
            poppins: ["'Poppins', sans-seri"],
         },
      },
   },

   important: true,
   plugins: [require('flowbite/plugin')],
};
