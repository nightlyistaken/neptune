IF_ISSUE := echo "getting an error? update your nodejs version and try again"

STARTING := echo Starting

start:
	git status
	${STARTING}
	sleep 2
	yarn -v
	sleep 1
	yarn
	$(IF_ISSUE)
	sleep 4
	yarn start

fmt:
	prettier -w .
