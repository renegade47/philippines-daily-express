select top 1 
	*,
	JSON_QUERY(json_metadata, '$.tags')
from 
   Comments (NOLOCK)
where 
   title <> '' and
   parent_author = '' and
   category = 'philippines' and
   datediff(hour, created, GETDATE()) between 0 and 24
order by 
   pending_payout_value desc