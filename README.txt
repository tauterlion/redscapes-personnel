REDSCAPES PERSONNEL DATABASE — TEMPLATE

FILES
-----
index.html               Main site / personnel lookup
styles.css               Complete responsive visual design
app.js                   Route handling + profile rendering
personnel.js             Personnel data file (currently EMPTY)
template-preview.html    Visual preview using placeholder data only
assets/redscapes-logo.png
_redirects               Netlify pretty-route support
netlify.toml              Netlify configuration

HOW THE QR LINKS WILL WORK
--------------------------
Recommended final QR:
https://YOUR-DOMAIN.com/personnel/RS-0302

The _redirects file tells Netlify to serve index.html for that route.
app.js reads RS-0302 from the URL and loads the matching record from personnel.js.

Portable fallback URL (works on hosts without rewrite support):
https://YOUR-DOMAIN.com/?id=RS-0302

ADDING DATA LATER
-----------------
Edit personnel.js and add records to window.REDSCAPES_PERSONNEL.

Example structure is included as a comment in personnel.js.

PHOTOS
------
Create:
assets/portraits/

Then place final images there, for example:
assets/portraits/rs-0302.jpg

Reference that path in the person's photo field.

LOCAL PREVIEW
-------------
Open template-preview.html to inspect the full visual template immediately.

Opening index.html directly will show the database lookup.
Pretty /personnel/RS-XXXX routes require hosting; ?id=RS-XXXX is the easiest local fallback.

NETLIFY
-------
Drag the entire unzipped folder into Netlify Drop, or deploy the folder from a repository.
The included _redirects and netlify.toml preserve the /personnel/RS-XXXX URL structure.

DESIGN NOTES
------------
The visual system is intentionally based on the supplied Redscapes ID:
black / white / red palette, angular facility mark, authorized-personnel header,
industrial labels, and a restrained security-record feel.

No real personnel records are included yet.


CURRENT DATABASE STATE
----------------------
12 personnel records are populated with:
- name
- personnel ID
- role
- division
- facility
- clearance
- status
- expiration
- guest quote (except Maria, pending)
- callsign
- portrait

Profile summaries and specializations were removed from the UI. Callsigns appear in the main identity fields.


REPLACING THE LOGO
------------------
Replace:
assets/redscapes-logo.png

with your final transparent PNG logo, keeping the same filename.
The website will automatically use the replacement everywhere.
