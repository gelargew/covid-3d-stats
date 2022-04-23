# 3d covid
a fast 3d covid stats viewer


data sourced from: 
- [COVID-19 Data Repository by the Center for Systems Science and Engineering (CSSE) at Johns Hopkins University](https://github.com/CSSEGISandData/COVID-19)
- [Worldometers](https://www.worldometers.info/coronavirus/)


whenever an application using a public API that frequently updated, it usually need to use server rendering to keep the page up-to-date from the data, which will result in the delay whenever the application page is opened and heavy computation for bigger traffic.

This application was made due to my curiosity about vercel functions, github workflow and nextjs staticprops. using the combination of those i managed to add some powerful features which are:
- all pages are static, no server side and client side computation.
- semi dynamic, which automatically fetch and update the pages daily using workflow 
- all the updated data saved as a json in this github repo
