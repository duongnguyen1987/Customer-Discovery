PAG 34 Customer Discovery — offline-capable Version 5

Upload ALL of the following to the root of your existing GitHub repository:
- index.html
- sw.js
- manifest.webmanifest
- icons/icon-192.png
- icons/icon-512.png

GitHub Pages should keep publishing from the existing branch (master) / (root).

After GitHub deployment, open the published app ONCE with internet on the iPhone, then add it to Home Screen. The service worker caches the app for later offline reopening. To verify, load the app once online, enable Airplane Mode, and open it from the Home Screen. Test with fictional data.

Customer information is saved in each browser/app instance using localStorage. There is NO cloud sync. Clearing site data / deleting the Home Screen app may remove records. Export JSON backups regularly to an Intertek-approved private location. Do not put customer records in the public GitHub repository.

A local HTML file opened directly from Files (file://) is not sufficient for service worker installation: use HTTPS GitHub Pages.

Updates: To update the cache for a subsequent version, change the CACHE name in sw.js. Keep records in the same site/origin and do not clear browser data.
