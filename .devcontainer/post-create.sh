
# Install all node modules
npm install

# When this fork receives changes from upstream, we want it to ignore any
# changes we made in this fork.  The reason is because this fork deletes many of
# the development tools in the upstream repo, to make this repo minimalist and
# small.  We don't want those tools added back in later.  See the .gitattributes
# file for details.
git config --global merge.ours.driver true
