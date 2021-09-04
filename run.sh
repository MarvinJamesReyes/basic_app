while getopts "c:t" arg; do
	case "${arg}" in
		c) cmd=${OPTARG};;
		t) test=true;;
	esac
done

if [ "$test" = true ] ; then
	echo TEST environment;
fi

if [ -n "$cmd" ] ; then
	echo Running $cmd;
fi

case "${cmd}" in
	breakdown)
		if [ "$test" = true ] ; then
			NODE_ENV=test bash -c 'node scripts/breakdown.js'
		else
			node scripts/breakdown.js
		fi
		;;
	setup)
		if [ "$test" = true ] ; then
			NODE_ENV=test bash -c 'node scripts/setup.js'
		else
			node scripts/setup.js
		fi
		;;
	lint)
		yarn eslint .
		;;
	test)
		NODE_ENV=test bash -c 'yarn mocha --recursive test'
		;;
esac