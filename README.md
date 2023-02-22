# [Ivory Coast Map Application](https://bridgestoprosperity.github.io/civ-map/home)
A custom map application was built using the data from the Cote d'Ivoire assessment data. [The application can be accesed here.](https://bridgestoprosperity.github.io/civ-map/home)

# Côte d'Ivoire Geospatial Data Assets

The Côte d'Ivoire bridge site assessment generated several geospatial data assets. These data assets were collected and curated in order to support the bridge site assessment project. This document serves to summarize these assets. The assets themselves are available as shape files.


## Assessment Data

The assessment data is the data collected in the field judging the suitability of bridge requests. Each assessed site is geographically represented by a point coordinate. There are 25 fields in this data; an explanation of each of these fields is below.

The data can be accessed in the [data folder](./home/data).


<table>
  <tr>
   <td><strong>Column Name</strong>
   </td>
   <td><strong>Explanation</strong>
   </td>
  </tr>
  <tr>
   <td>Opportunity Unique Identifier
   </td>
   <td>Identification number for assessment
   </td>
  </tr>
  <tr>
   <td>Bridge Name
   </td>
   <td>Assessment site name
   </td>
  </tr>
  <tr>
   <td>Country
   </td>
   <td>Country where site is located. In this report all sites were located in Côte d'Ivoire
   </td>
  </tr>
  <tr>
   <td>Level 1 Government
   </td>
   <td>Region where assessed site is located 
   </td>
  </tr>
  <tr>
   <td>Level 2 Government
   </td>
   <td>City where assessed site is located
   </td>
  </tr>
  <tr>
   <td>Level 3 Government
   </td>
   <td>Town where assessed site is located
   </td>
  </tr>
  <tr>
   <td>Level 4 Government
   </td>
   <td>Village where assessed site is located
   </td>
  </tr>
  <tr>
   <td>latitude
   </td>
   <td>Geographic latitude of site
   </td>
  </tr>
  <tr>
   <td>longitude
   </td>
   <td>Geographic longitude of site
   </td>
  </tr>
  <tr>
   <td>Reason site not valid
   </td>
   <td>If this site was flagged for rejection this field may have notes why
   </td>
  </tr>
  <tr>
   <td>Site Validation Comments
   </td>
   <td>General comments on whether the site is a valid bridge site and why/why not.
   </td>
  </tr>
  <tr>
   <td>Flag for Rejection
   </td>
   <td>Whether the site was flagged as not suitable by the assessment team.
   </td>
  </tr>
  <tr>
   <td>River crossing deaths in last 3 years
   </td>
   <td>How many deaths have been reported within the last three years related to this crossing
   </td>
  </tr>
  <tr>
   <td>Incident descriptions
   </td>
   <td>Description of the crossing incident(s) if applicable
   </td>
  </tr>
  <tr>
   <td>Days per year river is flooded
   </td>
   <td>Estimation of how many days per year the site is flooded
   </td>
  </tr>
  <tr>
   <td>Flood duration during rainy season
   </td>
   <td>How long it floods during the rainy season specifically
   </td>
  </tr>
  <tr>
   <td>Notes on social information
   </td>
   <td>Information on demographics
   </td>
  </tr>
  <tr>
   <td>Width of River During Flooding (m)
   </td>
   <td>Estimation of the width of the body of water when it is flooded in meters.
   </td>
  </tr>
  <tr>
   <td>Health access blocked by river
   </td>
   <td>Whether this site blocks access to health resources. If so, what type of health resources will be noted.
   </td>
  </tr>
  <tr>
   <td>Education access blocked by river
   </td>
   <td>Whether this site blocks access to education resources. If so, what type of education resources will be noted.
   </td>
  </tr>
  <tr>
   <td>Market access blocked by river
   </td>
   <td>Whether this site blocks access to a market.
   </td>
  </tr>
  <tr>
   <td>Other access blocked by river
   </td>
   <td>Other resources this site blocks access to.
   </td>
  </tr>
  <tr>
   <td>Form: Created Date
   </td>
   <td>Data of creation
   </td>
  </tr>
  <tr>
   <td>Form: Created By
   </td>
   <td>Individual creating the form
   </td>
  </tr>
  <tr>
   <td>geometry
   </td>
   <td>Point geometries of each site
   </td>
  </tr>
</table>



## Other Data

<table>
  <tr>
   <td><strong>File Name</strong>
   </td>
   <td><strong>Explanation</strong>
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_GBK_Lim_Region_poly
   </td>
   <td>Polygon of the Gbêkê region
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_SP_Lim_Region_poly 
   </td>
   <td>Polygon of the San Pedro region
   </td>
  </tr>
  <tr>
   <td>GBK_Host Village Radius
   </td>
   <td>A radius of ~5km from the school host villages in the Gbêkê region. A school basin includes all villages within that radius.
   </td>
  </tr>
  <tr>
   <td>SP_Host Village Radius
   </td>
   <td>A radius of ~5km from the school host villages in the San Pedro region. A school basin includes all villages within that radius.
   </td>
  </tr>
  <tr>
   <td>SKILLS_MCA_SP_Villages_pnt
   </td>
   <td>Point coordinates of all villages in San Pedro to benefit from school projects
   </td>
  </tr>
  <tr>
   <td>SKILLS_MCA_GBK_VIllage_Points
   </td>
   <td>Point coordinates of all villages in Gbêkê to benefit from school project
   </td>
  </tr>
  <tr>
   <td>GBK_Departments
   </td>
   <td>Departments/government level 2 polygons in Gbêkê region
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_SP_Lim_Deprt_poly
   </td>
   <td>Department/government level 2 polygons in San Pedro
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_GBK_Ecol_Prim_Rural_pt
   </td>
   <td>Existing primary schools in rural Gbêkê region
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_SP_Ecol_Prim_Rural_pt
   </td>
   <td>Existing primary schools in rural San Pedro region
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_SP_Colleg_Exist_pt
   </td>
   <td>Existing colleges in San Pedro
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_GBK_Lim_Sous_Pref_poly
   </td>
   <td>Government level 3 polygons in Gbêkê
   </td>
  </tr>
  <tr>
   <td>SKILLS_SEJEN_SP_Lim_Sous_Pref_poly
   </td>
   <td>Government level 3 polygons in San Pedro
   </td>
  </tr>
</table>